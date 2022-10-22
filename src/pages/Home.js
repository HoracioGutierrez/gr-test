import React from 'react'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'
import LoginForm from './LoginForm'

const Home = () => {

  const logged = useUsersStore(({ logged }) => logged)

  if(!logged) return <LoginForm />

  return (
    <Page title='Welcome!'>

    </Page>
  )
}

export default Home