## Sistema Pautas.com

### Iniciar o projeto

Para iniciar o projeto no Windows é necessário alterar o arquivo run.ps1 com o caminho para a pasta do projeto. Depois é só rodas o comando `.\run.ps1`.
```powershell
cd <local onde se encontra o projeto>\desafio-votacao-2.0\backend
Start-Process "cmd.exe" "/C npm run start:dev" -WindowStyle Minimized

cd <local onde se encontra o projeto>\desafio-votacao-2.0\frontend
Start-Process "cmd.exe" "/C npm run start" -WindowStyle Minimized

cd <local onde se encontra o projeto>\desafio-votacao-2.0
```

O backend irá rodar na porta `:3000`, e o frontend irá rodar na porta `:4200`.

Features não implementadas:
+ Filtro por categoria
+ Sistema de roles (papéis, funções), referente aos níveis de acesso.

Possíveis melhorias:
+ Implemntação de testes unitários
+ Melhoria em repossividade
+ Conexão com Prometheus, Grafana ou criação de dashboard para análise de métricas fornecidas.