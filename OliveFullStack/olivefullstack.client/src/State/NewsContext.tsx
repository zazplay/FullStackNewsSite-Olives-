import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface News {
    id: string;
    title: string;
    description: string;
    imgSrc: string;
    source: string;
    createdAt: Date;
    categoryId: string;
}

export interface ListNews {
    listNews: News[]
}

export interface NewsContextInterface {
    objNews: News[],
    setListNews: Dispatch<SetStateAction<News[]>>
}

const defaultState = {
    objNews:[], // Порожній список новин
    setListNews: () => { } // Заглушка для функції
} as NewsContextInterface

export const NewsContext = createContext(defaultState);

export type NewsProviderProps = {
    children: ReactNode;
}

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

export default function NewsProvaider({ children }: NewsProviderProps) {
    const [objNews, setListNews] = useState<News[]>([]);

    return (
        <NewsContext.Provider value={{ objNews, setListNews }} >
            {children}
        </NewsContext.Provider>
    );
}