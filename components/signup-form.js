import { signUpWithEmail } from '@/lib/server/actions';
const SignupForm = () => {
  return (
    <div>
      <form className='space-y-4' action={signUpWithEmail}>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            minLength={5}
            maxLength={32}
            required
            autoFocus
            autoComplete='email'
            enterKeyHint='next'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            minLength={8}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            required
            autoComplete='new-password'
            enterKeyHint='next'
          />
        </div>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent'
            required
            autoComplete='name'
            enterKeyHint='done'
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-slate-800 hover:bg-slate-600 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
