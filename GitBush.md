🗂 ОСНОВНЫЕ КОМАНДЫ GIT BASH

📁 Работа с папками и файлами:
--------------------------------
<pre>
mkdir имя_папки         - создать новую папку
cd имя_папки            - перейти в папку
cd ..                   - перейти на уровень выше
ls                      - список файлов и папок
ls -la                  - список включая скрытые файлы
pwd                     - показать текущую директорию
rm имя_файла            - удалить файл
rm -r имя_папки         - удалить папку с содержимым
touch имя_файла         - создать пустой файл
clear                   - очистить экран
</pre>

🔧 Основные команды Git:
--------------------------------
<pre>
git init                       - инициализировать репозиторий
git clone URL                  - клонировать репозиторий
git status                     - статус изменений
git add .                      - добавить все изменения
git commit -m "коммит"         - создать коммит с сообщением
git push                       - отправить изменения на GitHub
git pull                       - получить изменения с GitHub
git log                        - журнал коммитов
git branch                     - список веток локальных
git branch -r                  - список "удаленных" веток (находящихся на GitHub)
git checkout -b имя_ветки      - создать локально и переключиться на ветку
git checkout имя_ветки         - перейти на ветку имя_ветки
git merge имя_ветки            - объединить ветку с текущей
git branch -m новое_имя        - переименовать текущую открытую ветку в новое_имя  
git branch -d имя_ветки         - удалить ветку локально (но только если она уже слита с текущей веткой или другой)
git branch -D имя_ветки         - удалить ветку принудительно, если она не слита
  
git checkout -b имя_ветки origin/имя_ветки       - создает и переключается на "удаленную" (находящуюся на GitHub) ветку локально
</pre>

📦 Пример: создать проект
--------------------------------
<pre>
mkdir my-project
cd my-project
git init
touch index.html
git add .
git commit -m "Первый коммит"
</pre>  

📦 Пример: деплой на GitHub Pages
--------------------------------
<pre>
git pull              - получить изменения с GitHub
npm i                 - читает package.json и устанавливает необходимые для сборки пакеты
npm run build         - запускает сборку проекта
npm run deploy        - запускает deploy, загружает сайт на GitHub Pages
  ---альтернативный косой путь, если нет скрипта деплоя в файле package.json---
ls                    - показать список файлов в папке
cd dist               - перейти в папку dist
git checkout -b gh-pages        - создать ветку и перейти в нее
git add .
git commit -m "Deploy"
git push -f origin gh-pages     - перезапишет ветку gh-pages
</pre>
