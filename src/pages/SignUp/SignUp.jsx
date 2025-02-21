import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import axios from 'axios'


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const onSubmit = async (data) => {
  
    const { email, password, name } = data;
    const userInfo = {
      name,
      email
    }
    createUser(email, password)
      .then(data2 => {
        updateUserProfile(name)
          .then(() => {

          })
          .catch(err => {
            console.log(err.message)
          })
        // save user in database
        axiosPublic.post(`/all_users`, userInfo)
          .then(res2 => {
            console.log(res2.data)
            if (res2.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You are Sucessfully Registered",
                showConfirmButton: false,
                timer: 1500
              });

              navigate('/')
            }
          })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  // sign-up with google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are Sucessfully logged In",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch(err => {
        Swal.fire(err.message)
      })
  }

  return (
    <div>
      <Helmet>
        <title>Task Management | Signup</title>
      </Helmet>
      <div className='flex items-center w-full max-w-sm mx-auto overflow-hidden lg:flex-row-reverse
bg-gray-100 border-2 dark:border-purple-300 dark:bg-gray-700 rounded-lg shadow-lg  lg:max-w-md'>

        <div className='w-full px-6 py-8 md:px-8'>

          <p className='mt-3 text-2xl text-center dark:text-white text-gray-600 '>
            Sign Up
          </p>

          <div

            className='flex cursor-pointer items-center justify-center mt-4 dark:text-white text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '
          >
            <div className='px-4 py-2'>
              <svg className='w-6 h-6' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>

            <span onClick={handleGoogleSignIn} className='w-5/6 px-4 py-3 font-bold text-center'>
              Sign up with Google
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center dark:text-gray-300 text-gray-500 uppercase  hover:underline'>
              or login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* user name */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                htmlFor='LoggingName'
              >
                Name
              </label>
              <input
                id='name'
                autoComplete='name'
                name='name'
                {...register("name", { required: true })}
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />
              {errors.name && <span className='text-red-600'>Name field is required</span>}
            </div>
            {/* user email */}
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                {...register("email", { required: true })}
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>
            {/* user password */}
            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                {...register("password",
                  {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
              {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
              {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 characters</p>}
              {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one Uppercase,
                one lowercase,one number and one special characters</p>}
            </div>
            <div className='mt-6'>
              <input

                type='submit'
                value="Sign Up"
                className='btn w-full text-white font-bold 
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
              />

            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  '></span>

            <Link
              to='/login'
              className='text-xs dark:text-gray-300 text-gray-500 uppercase  hover:underline'
            >
              If You have an Account, Sign In
            </Link>

            <span className='w-1/5 border-b '></span>
          </div>
        </div>
      </div>
    </div>
  )
}

// const SignUp = () => {
//   const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
//   const navigate = useNavigate()
//   // form submit handler
//   const handleSubmit = async event => {
//     event.preventDefault()
//     const form = event.target
//     const name = form.name.value
//     const email = form.email.value
//     const password = form.password.value

//     try {
//       //2. User Registration
//       const result = await createUser(email, password)

//       //3. Save username & profile photo
//       await updateUserProfile(
//         name,
//         'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c'
//       )
//       console.log(result)

//       navigate('/')
//       toast.success('Signup Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }

//   // Handle Google Signin
//   const handleGoogleSignIn = async () => {
//     try {
//       //User Registration using google
//       await signInWithGoogle()

//       navigate('/')
//       toast.success('Signup Successful')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.message)
//     }
//   }
//   return (
//     <div className='flex justify-center items-center min-h-screen bg-white'>
//       <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//         <div className='mb-8 text-center'>
//           <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
//           <p className='text-sm text-gray-400'>Welcome to Task Management</p>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           noValidate=''
//           action=''
//           className='space-y-6 ng-untouched ng-pristine ng-valid'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Name
//               </label>
//               <input
//                 type='text'
//                 name='name'
//                 id='name'
//                 placeholder='Enter Your Name Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <label htmlFor='image' className='block mb-2 text-sm'>
//                 Select Image:
//               </label>
//               <input
//                 required
//                 type='file'
//                 id='image'
//                 name='image'
//                 accept='image/*'
//               />
//             </div>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Email address
//               </label>
//               <input
//                 type='email'
//                 name='email'
//                 id='email'
//                 required
//                 placeholder='Enter Your Email Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>
//               <input
//                 type='password'
//                 name='password'
//                 autoComplete='new-password'
//                 id='password'
//                 required
//                 placeholder='*******'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='bg-lime-500 w-full rounded-md py-3 text-white'
//             >
//               {loading ? (
//                 <TbFidgetSpinner className='animate-spin m-auto' />
//               ) : (
//                 'Continue'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-sm dark:text-gray-400'>
//             Signup with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         <div
//           onClick={handleGoogleSignIn}
//           className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
//         >
//           <FcGoogle size={32} />

//           <p>Continue with Google</p>
//         </div>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Already have an account?{' '}
//           <Link
//             to='/login'
//             className='hover:underline hover:text-lime-500 text-gray-600'
//           >
//             Login
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   )
// }

export default SignUp
