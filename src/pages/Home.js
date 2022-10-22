import React from 'react'
import useUsersStore from '../api/usersStore'
import Page from '../layout/Page'
import HomeForm from './HomeForm'

const Home = () => {

  const logged = useUsersStore(({ logged }) => logged)

  if(!logged) return <HomeForm/>

  return (
    <Page title='Welcome!'>

    </Page>
  )
}

export default Home