import axios from "axios";
import { News } from "./NewsContext";

// geting list news
//отримання всіх новин
export async function getAllNews() {
    try {
        const response = await axios.get<News[]>("https://localhost:7142/PresentationNews");
        // Логируем ответ
        console.log("response", response.data);
        // Записываем данные в массив
        if (response && response.data) {
            // Предполагается, что response.data содержит массив новостей
            return (response.data);
        }

    } catch (e) {
        console.log(e);
    }
    return [];
}

export async function getAllCategory() {
    try {
        const response = await axios.get("https://localhost:7142/PresentationCategory");

        if (response && response.data) {
            return response.data;
        }

    } catch (e) {
        console.log(e);
    }
    return [];
}