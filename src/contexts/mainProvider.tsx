import { createContext, useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import Color from "../common/Color";
import { useStorage } from "./useStorage";

interface MainContextProps {
    labels: any,
    settings: any,
    setSettings: (values: any) => Promise<void>,
}

export const MainContext = createContext<MainContextProps>({
    labels: {},
    settings: {},
    setSettings: () => Promise.resolve(),
})

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const { getItem, setItem, removeItem } = useStorage();
    const [labels] = useState<any>({ })
    const [settings, setSettings] = useState({})

    return (
        <MainContext.Provider value={{ labels, settings, setSettings: handleSettings, isLoading, token, user, updateUser, login: loginPress, logout }}>
            {children}
        </MainContext.Provider>
    )
}