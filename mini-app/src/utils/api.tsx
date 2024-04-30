const baseURL = "https://hacker-news.firebaseio.com/v0/";

// Функция для получения всех id новостей
export async function getIds() {
  try {
    const res = await fetch(`${baseURL}topstories.json?print=pretty`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Функция для получения новости по id
export async function getNews(id: number) {
  try {
    const res = await fetch(`${baseURL}item/${id}.json?print=pretty`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }

    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// Функция для получения новости по id
export async function getComments(id: number) {
  try {
    const res = await fetch(`${baseURL}item/${id}.json?print=pretty`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Не удалось получить данные с сервера");
    }

    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
