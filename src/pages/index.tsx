import { type FC } from "react";
import { type InferGetStaticPropsType, type NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { type Abonement, type Trainer } from "@prisma/client";

import PageLayout from "@/layouts/PageLayout";
import { prisma } from "@/server/db";

const IntroSection: FC = () => {
  console.log('check');
  
  return (
    <section id="intro" className="px-5 lg:px-10 pt-[80px]">
      <h1 className="text-h1 text-center mb-10">sportclub</h1>
      <div className="h-[700px] bg-[url(https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80)] bg-no-repeat bg-cover bg-center"></div>
    </section>
  )
}

const AboutSection: FC = () => {
  return (
    <section id="about" className="px-5 lg:px-10 pt-[100px] md:pt-[120px]">
      <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">про нас</span>
      <p className=" my-10 md:my-15 text-h3">
        <span className="font-bold border-b-8 border-primaryDarken">sportclub</span> - ідеальне місце для тих, хто прагне покращити свою фізичну форму, зберегти здоров&apos;я і насолоджуватися активним способом життя.
      </p>     

      <div className="flex flex-wrap justify-between py-20 gap-20 ">
        <div className="flex gap-5 items-start w-[350px]">
          <div className="text-[10rem] text-primaryDarken leading-none">2</div>
          <div className="text-p">
            <span className="font-bold ">зали</span>
            <p className="text-zinc-400 text-xs font-light mt-1">для жінок та чоловіків з широким спектром тренажерів і обладнання останнього покоління</p>
          </div>
        </div>
        <div className="flex gap-5 items-start w-[350px]">
          <div className="text-[10rem] text-primaryDarken leading-none">3</div>
          <div className="text-p">
            <span className="font-bold">тренери</span>
            <p className="text-zinc-400 text-xs font-light mt-1">
              які завжди готові надати вам професійну підтримку та план тренувань
            </p>
          </div>
        </div>
        <div className="flex gap-5 items-start w-[350px]">
          <div className="text-[10rem] text-primaryDarken leading-none">7</div>
          <div className="text-p">
            <span className="font-bold">відзнак</span>
            <p className="text-zinc-400 text-xs font-light mt-1">
                нашого клубу на різних конкурсах. нас визнають не лише клієнти
            </p>
          </div>
        </div>
      </div>
      <ul className="mt-10 text-h3 list-disc list-inside flex flex-col gap-2">
        <h3 className="mb-5">послуги:</h3>
        <li>індивідуальні тренування</li>
        <li>персональний тренерський супровід</li>
        <li>фітнес-консультування</li>
        <li>розробка програми харчування</li>
      </ul>

      <div className="flex flex-col md:flex-row gap-3 my-20">
        <div className="h-[700px]  md:w-[50%] bg-[url(https://images.unsplash.com/photo-1574680376345-b2995af0324f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)] bg-no-repeat bg-cover bg-center"></div>
        <div className="h-[700px] md:w-[50%] bg-[url(https://images.unsplash.com/photo-1574680088814-c9e8a10d8a4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)] backdrop-brightness-50bg-no-repeat filter-g bg-cover bg-center"></div>
      </div>
      <h2 className="text-h2">здоров&apos;я - твій успіх, фітнес - твій шлях!</h2>
    </section>
  )
}

const TrainersSection: FC<{trainers: Trainer[]}> = ({trainers}) => {
  return (
    <section id="trainers" className="px-5 lg:px-10 pt-[100px] md:pt-[120px]">
      <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">тренери</span>
      <div className="flex gap-10 justify-center flex-wrap mt-20">
        {trainers.map(trainer => {
          return (
            <div className="max-w-[400px] w-full" key={trainer.id}>
              <div 
                className={`w-full h-[500px] bg-cover bg-center`}
                style={{backgroundImage: `url(${trainer.trainerImage})`}}
              ></div>
              <div className="mt-5">
                <h3 className="text-h3 flex flex-col">
                  <span>{trainer.firstName}</span>
                  <span>{trainer.lastName}</span>
                </h3>
                <p className="text-p text-gray-400 font-light">{trainer.trainerDescription}</p>
                <p className="mt-2">дні занять: {trainer.days}</p>
              </div>
            </div>
          )
        })} 
      </div>
    </section>
  )
}

const AbonementsSection: FC<{abonements: Abonement[]}> = ({abonements}) => {
  const { data: sessionData } = useSession()
  return (
    <section id="abonements" className="px-5 lg:px-10 pt-[100px] pb-[150px] md:pt-[120px]">
      <span className="text-descriptor text-gray-700 border-l-4 border-l-primaryDarken pl-10 py-2 font-light">абонементи</span>
      <div className="flex flex-wrap gap-10 justify-center mt-20">
        {abonements.map(abonement => {
          const orderPath = `orders/abonement/${abonement.id}`
          const signInUrl = `sign-in` 
          const url = sessionData ? orderPath : `${signInUrl}?redirectToPath=${orderPath}` 
          return (
            <div key={abonement.id} className="max-w-[400px] h-[300px] md:h-[500px] flex flex-col bg-borderDark text-white rounded-[10px] justify-between w-full shadow-lg p-10">
              <h3 className="text-h3">{abonement.abonementName}</h3>
              <div>
                <ul className="flex flex-col list-image-[url(../../public/icons/check.svg)] list-inside">
                  <li>кількість занять: {abonement.sessionsCount}</li>
                  <li>тренер: {abonement.trainerIncluded ? "є" : "немає"}</li>
                  <li>тривалість дії абонементу: {abonement.duration} дні(в)</li>
                </ul>
                <div className="flex justify-between items-center mt-10">
                  <div className=" text-[2rem] font-bold">{abonement.price} грн</div>
                  <Link href={url} className=" bg-primary text-black px-5 py-2 rounded-[5px] transition-colors hover:bg-primaryDarken">придбати</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const HomePage: NextPage<PageProps> = ({ trainers, abonements }) => {
  return (
    <PageLayout>
      <IntroSection />
      <AboutSection />
      <TrainersSection trainers={trainers}/> 
      <AbonementsSection abonements={abonements}/>
    </PageLayout>
  );
};

export default HomePage;

export const getStaticProps = async () => {  
  const trainers = await prisma.trainer.findMany()
  const abonements = await prisma.abonement.findMany()

  return {
    props: {
      trainers,
      abonements
    }
  }
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;