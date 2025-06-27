import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@/components/animate-ui/headless/tabs'
import { Login } from './Login'
import { Registration } from './Registration'

export default () => {
  return (
    <div className='sm:w-full sm:my-20   sm:flex justify-center '>
      <TabGroup className={'w-full sm:w-[400px] bg-muted rounded-lg'}>
        <TabList className='grid w-full grid-cols-2'>
          <Tab index={0}>Вход</Tab>
          <Tab index={1}>Регистрация</Tab>
        </TabList>
        <TabPanels className='mx-1 mb-1 -mt-2 rounded-sm h-full bg-background'>
          <TabPanel className='space-y-6 p-6'>
            <Login />
          </TabPanel>
          <TabPanel className='space-y-6 p-6'>
            <Registration />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}
