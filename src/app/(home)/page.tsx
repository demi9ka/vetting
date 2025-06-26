import { SearchForm } from './SearchForm'

export default () => {
  return (
    <div className='w-full h-[calc(100svh-120px)] flex justify-center items-center'>
      <div className='flex flex-col gap-2 items-center'>
        {/* <h2 className='text-3xl text-center'>Анализ</h2> */}
        <SearchForm />
      </div>
    </div>
  )
}
