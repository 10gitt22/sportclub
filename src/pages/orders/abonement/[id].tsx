/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type NextPage, type GetStaticPaths, type GetStaticPropsContext, type InferGetStaticPropsType } from "next"

import { prisma } from "@/server/db"
import { generateSSGHelper } from "@/server/helpers/ssgHelper"

import { Loader } from "@/components/Loader"

import { api } from "@/utils/api"
import PageLayout from "@/layouts/PageLayout"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import { Order } from "@/modules/orders"


export const getStaticPaths: GetStaticPaths = async () => {
  const abonements = await prisma.abonement.findMany()
  const paths = abonements.map((abonement) => {
    return {
      params: { id: abonement.id.toString() }
    }
  })

  return {paths, fallback: "blocking"}
}

export const getStaticProps = async (ctx: GetStaticPropsContext<{id: string}>) => {
  const ssg = generateSSGHelper()
  const id = ctx.params?.id
  if (typeof id !== "string") throw new Error("no id");

  await ssg.profile.getProfile.prefetch()
  await ssg.abonement.getById.prefetch({ id })
  await ssg.trainer.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id
    }
  }
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;



const OrderAbonement: NextPage<PageProps> = ({ id }) => {
  const { push, asPath } = useRouter()

  const profileQuery = api.profile.getProfile.useQuery(undefined, {
    retry: false, 
    onError: (error) => {
      void push('/')
      toast.error(error.message)
    },
    onSuccess: (data) => {
      if (!data) {
        const path = asPath.substring(1)
        toast('для замовлення потрібно створити профіль!', {
          icon: '❗❗❗'
        })
        void push(`/profile/create?redirectToPath=${path}`)
      }
    },
    refetchOnMount: true, 
    refetchOnWindowFocus: false
  })

  const abonementQuery = api.abonement.getById.useQuery({ id }, { refetchOnMount: false, refetchOnWindowFocus: false })
  const trainersQuery = api.trainer.getAll.useQuery(undefined, { refetchOnMount: false, refetchOnWindowFocus: false })
  
  if (profileQuery.status === 'error') {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    )
  }

  if (abonementQuery.status === 'loading' || trainersQuery.status !== 'success') {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  if (!abonementQuery.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-h1">404</h1>
          <span className="text-descriptor">абонемент не знайдено 🤷‍♂️</span>
        </div>
      </div>
    )
  }

  if (!profileQuery.data) {
    return (
      <></>
    )
  }

  const { data: profile } = profileQuery
  const { data: abonement } = abonementQuery
  const { data: trainers } = trainersQuery

  return (
    <PageLayout>
      <div className="w-full h-[calc(100vh_-_80px)] px-10 pt-10 pb-20">
        <Order profile={profile} abonement={abonement} trainers={trainers}/>
      </div>
    </PageLayout>
  )
}

export default OrderAbonement