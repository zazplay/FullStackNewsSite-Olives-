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



export default function NewsProvaider({ children }: NewsProviderProps) {
    const [objNews, setListNews] = useState<News[]>([]);

    return (
        <NewsContext.Provider value={{ objNews, setListNews }} >
            {children}
        </NewsContext.Provider>
    );
}