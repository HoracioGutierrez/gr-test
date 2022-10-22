import create from 'zustand'

const useUsersStore = create(set => ({
    users: [],
    current: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    logged: localStorage.getItem('user') ? true : false,
    setUsers: users => set({ users }),
    login : user => {
        localStorage.setItem('user', JSON.stringify(user))
        set({ current: user, logged: true })
    },
    logout: () => {
        localStorage.removeItem('user')
        set({ current: null, logged: false })
    }
}))

export default useUsersStore