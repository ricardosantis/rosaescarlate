# Deploy - Saboaria Rosa Escarlate

## 🚀 Processo de Deploy

O deploy da aplicação é **automático** e feito através do **GitHub**. Não é necessário executar comandos manuais do Wrangler.

### Como funciona

1. **Push para GitHub** → Cloudflare Pages detecta automaticamente
2. **Build automático** → Vite build é executado
3. **Deploy automático** → Site atualizado em produção

### Fluxo de trabalho

```bash
# 1. Faça suas alterações
git add .
git commit -m "Sua mensagem descritiva"

# 2. Push para o GitHub
git push origin main

# 3. Pronto! Deploy automático em andamento
```

### URLs

- **Produção:** https://rosaescarlate.me
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Repositório GitHub:** https://github.com/ricardosantis/rosaescarlate

### Comandos úteis (apenas para verificação)

```bash
# Verificar status dos deploys (apenas leitura)
npx wrangler pages deployment list --project-name rosaescarlate

# Verificar build local
npm run build

# Verificar versão do Wrangler
npx wrangler --version
```

### ⚠️ Importante

- **NÃO execute** `npx wrangler pages deploy` em produção
- O deploy manual pode ser sobrescrito pelo deploy automático do GitHub
- Alterações no GitHub levam de 1-3 minutos para refletir em produção

### Cache

Se as alterações não aparecem imediatamente:
1. Limpe cache do navegador (Ctrl+F5)
2. Aguarde 2-3 minutos para propagação
3. Use aba anônima para verificar

### Arquivos de configuração

- `wrangler.toml` - Configuração do Cloudflare Pages
- `package.json` - Scripts de build
- `.gitignore` - Arquivos ignorados no deploy

---

**Última atualização:** 20/03/2026  
**Versão:** 1.0
