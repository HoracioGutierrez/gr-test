import create from 'zustand'

const useUsersStore = create(set => ({
    users: [],
    current: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loggued: localStorage.getItem('user') ? true : false,
    setUsers: users => set({ users }),
    login : user => {
        localStorage.setItem('user', JSON.stringify(user))
        set({ current: user, loggued: true })
    },
    logout: () => {
        localStorage.removeItem('user')
        set({ current: null, loggued: false })
    }
}))

export default useUsersStore