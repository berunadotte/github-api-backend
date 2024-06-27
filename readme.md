Серверная часть тестового задания по поиску популярных репозиториев через github API. Время обновления может быть изменено, по умолчанию 10 минут.

Способы работы с API:

1) Список популярных репозиториев
  /repositories

2) Поиск репозитория по имени
  /repositories/search?name='имя репозитория'

3) Поиск репозитория по id
  /repository/'id репозитория'

4) Принудительная синхронизация с github API
  /sync

При помощи CLI (при выполнении через Node.js):

1) Список популярных репозиториев
  node cli.js list

2) Поиск репозитория по имени
  node cli.js search 'имя репозитория'

3) Поиск репозитория по id
  node cli.js get 'id репозитория'

4) Принудительная синхронизация с github API
  node cli.js sync

Примечание: id и имена репозиториев указываются без апострофов