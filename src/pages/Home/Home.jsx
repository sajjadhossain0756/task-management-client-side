import { Helmet } from 'react-helmet-async'
import Container from '../../components/Shared/Container'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import axios from 'axios'
import Swal from 'sweetalert2'

const Home = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm()
  const axiosPublic = useAxiosPublic()

  const onSubmit = async (data) => {

    console.log(data)

    const tasksInfo = {
      title: data.title,
      category: data.category,
      description: data.description,
      Date: new Date().toISOString(),
    }
    console.log(tasksInfo)
    const taskData = await axios.post(`http://localhost:3008/all_tasks`, tasksInfo)
      .then(taskData => {
        console.log(taskData.data)
        // Close modal using document.getElementById
        document.getElementById("my_modal_5").close();

        if (taskData.data.insertedId) {
          reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sucessfully Task Created",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })

  }

  return (
    <div className='bg-green-500'>
      <Helmet>
        <title> Task Management | Home</title>
      </Helmet>
      <div className='text-center py-2'>
        <button className='btn' onClick={() => document.getElementById('my_modal_5').showModal()}>Create A Task</button>
      </div>
      <Container>
        <div className=' flex'>
          <div className='bg-purple-500 flex-1'>
            <p className='text-2xl font-bold text-center'>To do</p>
          </div>
          <div className='bg-pink-500 flex-1'>
            <p className='text-2xl font-bold text-center'>In progress</p>
          </div>
          <div className='bg-yellow-500 flex-1'>
            <p className='text-2xl font-bold text-center'>Done</p>
          </div>
        </div>
        <dialog id="my_modal_5" className="modal modal-middle">
          <div className="modal-box">
            <section className=' p-2 md:p-6 mx-auto  bg-gray-600 text-white rounded-md shadow-md '>
              <h2 className='text-4xl text-center font-bold text-white  capitalize '>
                Create a New Task
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto'>
                <div className='grid mt-4'>
                  {/*title */}
                  <div>
                    <label className='text-white ' htmlFor='job_title'>
                      Title
                    </label>
                    <input
                      id='title'
                      placeholder='article title'
                      name='title'
                      {...register("title", { required: true })}
                      type='text'
                      className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                    />
                    {errors.title && <span className='text-red-600'>News title field is required</span>}
                  </div>
                </div>
                <div className=' mt-4 items-end'>
                  {/* category */}
                  <div className='flex flex-col gap-2 '>
                    <label className='text-white ' htmlFor='category'>
                      Category
                    </label>
                    <select
                      defaultValue='default'
                      name='category'
                      {...register("category", { required: true })}
                      id='category'
                      className='border bg-white text-gray-700 p-2 rounded-md w-full'
                    >
                      <option value='default'>Select A Category</option>
                      <option>Java</option>
                      <option>Go</option>
                      <option>C</option>
                    </select>
                  </div>
                </div>
                {/* description */}
                <div className='flex flex-col gap-2 mt-4'>
                  <label className='text-white ' htmlFor='description'>
                    Description
                  </label>
                  <textarea
                    className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                    name='description'
                    {...register("description", { required: true })}
                    id='description'
                  ></textarea>
                </div>
                <div className='mt-6'>
                  <input

                    type='submit'
                    value="Create Task"
                    className='btn w-full text-white font-bold 
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
                  />

                </div>
              </form>
            </section>
          </div>
        </dialog>
      </Container>

    </div>
  )
}

export default Home
