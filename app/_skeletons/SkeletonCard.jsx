import { Skeleton } from "@/components/ui/skeleton"
import { HiBookOpen, HiChartBar, HiEllipsisVertical } from "react-icons/hi2";

export function SkeletonCard() {
  return (
    <div className='border-2 rounded-lg p-2 shadow-sm'>
      <Skeleton className="h-[150px] w-full rounded-lg bg-slate-200" />
      <div className="p-2">
        <h2 className='font-bold text-lg flex justify-between items-center'>
          <Skeleton className="h-6 w-1/2 bg-slate-200" />
          <HiEllipsisVertical className='flex-none'/>
        </h2>

        <div className='flex justify-between mt-2'>
          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiBookOpen />
            <Skeleton className="h-6 w-[20px] bg-slate-200"/> Kapitel
          </h2>

          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiChartBar />
            <Skeleton className="h-6 w-[50px] bg-slate-200"/>
          </h2>
        </div>
      </div>
    </div>
  )
}


{/* <div className='border-2 rounded-lg p-2 shadow-sm'>
      <Link href={'/course/'+course?.courseID}>
        <Image
        src={course?.courseBanner || "/placeholder.png"} //5:00:52
        width={200}
        height={100}
        alt="Kursbild"
        priority={true}
        className='w-full h-[200px] object-scale-down cursor-pointer'
        style={{width: 'auto', height: '100px'}}
        />
      </Link>
      <div className='p-2'>
        <h2 className='font-bold text-lg flex justify-between items-center'>
          {course?.theme}
          <DropdownOption
          handleOnDelete={()=>handleOnDelete()}
          >
            <HiEllipsisVertical className='flex-none'/>
          </DropdownOption>
        </h2>

        <div className='flex justify-between mt-2'>
          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiBookOpen />
            {course?.courseOutput?.kapitel?.length} Kapitel
          </h2>

          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiChartBar className={`${course?.difficulty == 'leicht' ? 'text-green-500' : course?.difficulty == 'mittel' ? 'text-yellow-500': 'text-red-500'}`}/>
            {course?.difficulty}
          </h2>
        </div>
      </div>
    </div> */}
