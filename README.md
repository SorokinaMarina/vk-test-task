# Приложение с новостями

Мини-приложение, реализованное на платформе [VK Mini Apps](https://dev.vk.com/ru) с использованием [Hacker News API](https://news.ycombinator.com/news). 
UI разработан с помощью [VKUI](https://dev.vk.com/ru/libraries/vkui). 
Роутинг выполнен с помощью [vk-mini-apps-router](https://dev.vk.com/ru/libraries/router).

### ID: 51914756
[m.vk.com](https://prod-app51914756-08f40c4213a5.pages-ac.vk-apps.com/index.html)

[vk.com](https://prod-app51914756-08f40c4213a5.pages-ac.vk-apps.com/index.html)


## Описание
  Приложение состоит из двух страниц - главной и страницы с новостью. 
  
  На главной странице выводится список новостей, отсортированный по дате. Самые свежие новости отображаются сверху. Список обновляется каждую минуту. Новости можно обновить вручную, нажав на кнопку "Обновить ленту".

  Кликнув по новости происходит переход на отдельную страницу с новостью, где можно ознакомиться с более подробной информацией о ней. На странице будут доступны комментарии пользователей и ссылка на источник. 

## Технологии
* HTML
* TypeScript
* React
* Redux Toolkit
* REST API
* Git
* Yarn

## Инструкция по устновке и запуску приложения локально

* Клонировать репозиторий

  `git clone git@github.com:SorokinaMarina/vk-test-task.git`

* Перейти в папку mini-app

  `cd mini-app`

* Устанавить зависимости:

  `yarn install`

* Чтобы приложение заработало, придётся открыть два терминала. В одном терминале запускаем проект командой:

  `yarn start`

  Во втором терминале запускаем tunnel командой:

  `yarn run tunnel`

Приложение запустится на localhost:3000.
