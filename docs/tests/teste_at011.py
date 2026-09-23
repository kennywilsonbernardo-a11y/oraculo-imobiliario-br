"""AT-011 - Diagnóstico: check 8 (SHA-256) e pré-requisito.
Roda o index.html real num navegador headless, servido por HTTP local, em 4 cenários.
Uso: python3 docs/tests/teste_at011.py   (requer playwright + chromium)"""
import asyncio, hashlib, http.server, os, shutil, sys, tempfile, threading, functools
from playwright.async_api import async_playwright
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SHA_REAL = hashlib.sha256(open(os.path.join(RAIZ,'biblioteca/BR/AL/alagoas.json'),'rb').read()).hexdigest()

def servir(pasta):
    class Silencioso(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Silencioso, directory=pasta)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

async def rodar(pagina, url, carregar=True):
    await pagina.goto(url); await pagina.wait_for_timeout(800)
    if carregar:
        await pagina.click('#btnCarregar'); await pagina.wait_for_timeout(800)
    else:  # a página carrega a base sozinha ao abrir; simula falha de carregamento zerando o estado
        await pagina.evaluate('BASE = []; BASE_BYTES = null;')
    await pagina.evaluate('diagnostico10()'); await pagina.wait_for_timeout(800)
    return await pagina.inner_text('#preChecks')

async def main():
    falhas = 0
    def ok(cond, msg):
        nonlocal falhas
        print(('✅ ' if cond else '❌ ') + msg); falhas += (not cond)
    async with async_playwright() as p:
        nav = await p.chromium.launch(); pg = await nav.new_page()
        for nome, conteudo in [('sem_selo', None), ('selo_correto', SHA_REAL), ('selo_errado', '0'*64), ('selo_invalido', 'abc')]:
            tmp = tempfile.mkdtemp(); shutil.copytree(RAIZ, tmp, dirs_exist_ok=True, ignore=shutil.ignore_patterns('.git'))
            selo = os.path.join(tmp,'biblioteca/BR/AL/alagoas.sha256')
            if os.path.exists(selo): os.remove(selo)
            if conteudo is not None: open(selo,'w').write(conteudo+'  alagoas.json\n')
            srv = servir(tmp); url = f'http://127.0.0.1:{srv.server_address[1]}/index.html'
            txt = await rodar(pg, url)
            linha8 = [l for l in txt.splitlines() if '8/10' in l][0]
            if nome=='sem_selo':
                ok('❌' in linha8 and 'PENDENTE' in linha8 and SHA_REAL in linha8, f'[{nome}] ausência do selo NÃO soma ponto e mostra PENDENTE + hash calculado')
                ok('NOTA: 9/10' in txt, f'[{nome}] nota honesta 9/10 (era 10/10 antes da AT-011)')
            elif nome=='selo_correto':
                ok('✅' in linha8 and 'Íntegra' in linha8, f'[{nome}] selo igual aos bytes do arquivo = aprovado')
                ok('NOTA: 10/10' in txt, f'[{nome}] nota 10/10 só com selo conferido')
            elif nome=='selo_errado':
                ok('❌' in linha8 and 'DIVERGENTE' in linha8, f'[{nome}] selo com 64 hex porém diferente = reprovado (antes passava)')
            else:
                ok('❌' in linha8 and 'inválido' in linha8, f'[{nome}] selo mal formatado = reprovado')
            if nome=='sem_selo':
                txt0 = await rodar(pg, url, carregar=False)
                ok('NÃO EXECUTADO' in txt0 and 'NOTA' not in txt0, '[sem_base] sem base carregada o diagnóstico não roda nem dá nota')
            srv.shutdown(); shutil.rmtree(tmp)
        await nav.close()
    print('='*50); print('🎉 TODOS OS TESTES PASSARAM' if not falhas else f'❌ {falhas} FALHA(S)'); sys.exit(1 if falhas else 0)
asyncio.run(main())
