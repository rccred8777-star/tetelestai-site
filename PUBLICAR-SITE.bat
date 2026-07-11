@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ==============================================
echo   Publicando o site Tetelestai no GitHub...
echo ==============================================
echo.
git init
git add -A
git -c user.email=site@tetelestai.org -c user.name="Tetelestai Site" commit -m "Site Tetelestai v3.2 - gestao de cursos, alunos, comunicados e eventos"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/rccred8777-star/tetelestai-site.git
git push -u origin main
echo.
echo ==============================================
echo   Se apareceu algo como "main -^> main", DEU CERTO!
echo   Pode fechar esta janela e me avisar.
echo ==============================================
pause
