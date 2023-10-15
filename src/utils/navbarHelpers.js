import { errorNotification } from "./notifications";

export const setOverlay = (mainRef, containerRef, cartIsOpen, menuIsOpen) => {
    const container = containerRef.current
    const mainSection = mainRef.current

    const viewport = window.innerWidth;
    if (container && container.current && mainSection && mainSection.current) {
        if(cartIsOpen || menuIsOpen){
            mainSection.classList.add('blur')   
            container.classList.add('min-h-[113vh]')
            if (viewport < 640 && !menuIsOpen) {
                mainSection.classList.add('hidden')   
            }
            if(menuIsOpen && mainSection.classList.contains('hidden')) mainSection.classList.remove('hidden')
        } else {
            mainSection.classList.remove('blur')   
            container.classList.remove('min-h-[113vh]')
            if (viewport < 640 && !menuIsOpen) {
                mainSection.classList.remove('hidden')   
            }
        }
    }
}

export const logout = async (user) => {
    try {
        await axios('https://be.aiszef.pl/users/logout/', {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }})
        user.logged_in = false
    } catch (err) {
        errorNotification("Coś poszło nie tak")
    }
}