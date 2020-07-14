-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 14 2020 г., 19:10
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tasksdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `descplace`
--

CREATE TABLE `descplace` (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `users` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`users`)),
  `tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `complited` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `descplace`
--

INSERT INTO `descplace` (`id`, `name`, `description`, `users`, `tasks`, `complited`) VALUES
(19, 'Главная доска', 'Самая главная доска со всеми причудами', '[{\"id\":1,\"isadm\":3},{\"id\":2,\"isadm\":1},{\"id\":3,\"isadm\":1}]', '[4,5,6,7,8,9,35,37,38,40,41,42,43,44,45,46,47,50,55,56,57,58,59,60,61,63,72]', 0),
(48, 'Может быть потом пофикшу', 'Таски которые очень трудно делать да и особо смысла нет, если не на продакшен', '[{\"id\":1,\"isadm\":3}]', '[64]', 0),
(49, '7', '0', '[]', NULL, 0),
(51, 'Видео', 'Фунционал, который нужно показать на видео', '[{\"id\":1,\"isadm\":3}]', '[]', 0),
(53, 'Тестовая доска', 'тест', '[{\"id\":1,\"isadm\":3},{\"id\":3,\"isadm\":1}]', '[73,74,75,76]', 0),
(54, 'SpyFall', 'DEvelop game', '[{\"id\":1,\"isadm\":3}]', '[78,79]', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `whois` varchar(30) CHARACTER SET utf8 NOT NULL,
  `position` int(2) NOT NULL DEFAULT 0,
  `last_user` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `table_id`, `name`, `description`, `whois`, `position`, `last_user`) VALUES
(4, 19, 'Защита доступа', 'Доступ к доскам только для приглашенных', 'Selevn', 1, 'Salam'),
(5, 19, 'Удаление', 'Тасков и досок', 'Selevn', 1, 'Salam'),
(6, 19, 'Ввод данных', 'Прерывай при отмене', 'Selevn', 2, 'Salam'),
(7, 19, 'Редиректы', 'добавить редиректы со страниц успеха неудачи и с любой другой', 'Selevn', 2, 'Selevn'),
(8, 19, 'Люди', 'Добавление людей в доступ к доске', 'Selevn', 2, 'Selevn'),
(9, 19, 'Визуал', 'Внешний вид формы регистрации/входа', 'Selevn', 2, 'Selevn'),
(10, 19, 'Автообновление', 'Сделать автообновление добавленных тасков', 'Selevn', 2, 'Selevn'),
(35, 19, 'Друзья', 'Поиск и добавление друзей', 'Selevn', 2, 'Selevn'),
(37, 19, 'notifications', 'Уведомления справа, друзья слева', 'Selevn', 0, 'Salam'),
(38, 19, 'Друзья', 'Не добавил - не можешь приглашать', 'Selevn', 2, 'Selevn'),
(40, 19, 'не приглашать если приглашен у', 'да', 'Selevn', 2, 'Selevn'),
(41, 19, 'Удалить', 'ИЗ друзей', 'Selevn', 2, 'Selevn'),
(42, 19, 'Добавление таска', 'обновление страницы', 'Selevn', 2, 'Selevn'),
(43, 19, 'добавлене таблиц', 'обновление новых таблиц при обновлении, не при перезаходе в систеу', 'Selevn', 2, 'Selevn'),
(44, 19, 'Баг', 'Не заходит если 0 таблиц', 'Selevn', 2, 'Selevn'),
(45, 19, 'баг', 'покидание досок', 'Selevn', 2, 'Selevn'),
(46, 19, 'Участники', 'Проверка участников descа', 'Selevn', 2, 'Salam'),
(47, 19, 'КИк', 'участников из descа', 'Selevn', 2, 'Selem'),
(50, 19, 'Если доска пустая - удаляй', '', 'Selevn', 2, 'Salam'),
(55, 19, 'Нажатие', 'на уведомления/друзей открывает блок взаимодействия', 'Selevn', 2, 'Selevn'),
(56, 19, 'Запрос', 'В друзья самому себ фикс', 'Selevn', 2, 'Selevn'),
(57, 19, 'AJAX', 'Перевод тасков на ajax чтобы меньше обновлять страницу', 'Selevn', 2, 'Salam'),
(58, 19, 'Добавление/удаление из админов', 'в', 'Selevn', 2, 'Selem'),
(59, 19, 'Наведение на ккарточку', 'цвет', 'Selevn', 2, 'Selem'),
(60, 19, 'внешний вид', 'поля карточек', 'Selevn', 2, 'Salam'),
(61, 19, 'Куки', 'время жизки печенюх час', 'Selevn', 2, 'Selem'),
(62, 46, 'Kick shity Selevn', 'yes do it', 'Salam', 1, 'Salam'),
(63, 19, 'Кавычка баг', '', 'Salam', 2, 'Salam'),
(64, 48, 'Уникальность имени таблицы', 'повторения имен таблиц', 'Selevn', 0, 'Selevn'),
(65, 50, 'smth', '', 'Salam', 2, 'Salam'),
(71, 52, 'Тестовый таск', 'Тест', 'Selevn', 2, 'Salam'),
(72, 19, 'баг', 'Удаление последнего таска', 'Salam', 0, 'Salam'),
(73, 53, 'Показать друзей', 'Удаление и добавление', 'Selevn', 2, 'Selevn'),
(74, 53, 'Показать уведомления', '', 'Selevn', 2, 'Selem'),
(75, 53, 'привелегии', '', 'Selevn', 2, 'Selevn'),
(76, 53, 'работа с тасками', '', 'Selevn', 2, 'Selevn'),
(78, 54, 'Вход пользователей', '', 'Selevn', 0, 'Selevn'),
(79, 54, 'Видеть всех пользователей', '', 'Selevn', 0, 'Selevn');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(35) CHARACTER SET utf8 NOT NULL,
  `email` varchar(40) CHARACTER SET utf8 NOT NULL,
  `password` varchar(128) CHARACTER SET utf8 NOT NULL,
  `activated` tinyint(1) NOT NULL,
  `online` tinyint(1) NOT NULL,
  `tasks_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `friends` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`friends`)),
  `notifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`notifications`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `activated`, `online`, `tasks_id`, `friends`, `notifications`) VALUES
(1, 'Selevn', 'van000200136@gmail.com', '1234', 0, 0, '[19,48,53,54]', '[\"Selem\",\"Salam\"]', '[]'),
(2, 'Salam', 'salam@gmail.com', '1234', 0, 0, '[19,51]', '[\"Selevn\"]', '[]'),
(3, 'Selem', 'selem@gmail.com', '1234', 0, 0, '[19,53]', '[\"Selevn\"]', '[]');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `descplace`
--
ALTER TABLE `descplace`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `descplace`
--
ALTER TABLE `descplace`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
