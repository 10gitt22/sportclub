import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import google_icon from 'public/icons/google.svg'

const SignInPage = () => {
  const { query } = useRouter()

  const handleSignIn = async () => {
    let url = `${window.location.origin}/profile/create`
    if (query.redirectToPath) {
      url = `${url}?redirectToPath=${query.redirectToPath as string}`
    }

    await signIn('google', {callbackUrl: url})
  }
  
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center">
        <h3 className="text-h2">sportclub</h3>
        {/* eslint-disable-next-line*/}
        <button className="flex items-center px-10 py-2 mt-5 rounded-[5px] border-2 border-black font-medium text-button duration-200 gap-3 transition-colors hover:text-white hover:bg-black" onClick={handleSignIn}><div className="flex items-center" style={{lineHeight: 1}}>увійти за допомогою</div> <div className="w-8"><Image src={google_icon} width={0}  height={0} sizes="100vw" style={{width: '100%', height: 'auto'}} alt="google_icon"/></div></button>
      </div>
    </div>
  )
}

export default SignInPage