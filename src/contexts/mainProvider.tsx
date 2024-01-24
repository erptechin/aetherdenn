import { createContext, useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import Color from "../common/Color";
import { useStorage } from "./useStorage";

interface MainContextProps {
    settings: any,
    setSettings: (values: any) => Promise<void>,
}

export const MainContext = createContext<MainContextProps>({
    settings: {},
    setSettings: () => Promise.resolve(),
})

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const { getItem, setItem, removeItem } = useStorage();
    const [settings, setSettings] = useState({})
    useEffect(() => {
        getItem('settings').then((value) => {
            setSettings(value ? value : { ...Color })
        });
    }, []);

    const handleSettings = async (value: any) => {
        setItem('settings', { ...value, ...Color });
        return setSettings({ ...value, ...Color })
    }

    return (
        <MainContext.Provider value={{ settings, setSettings: handleSettings }}>
            {children}
        </MainContext.Provider>
    )
}