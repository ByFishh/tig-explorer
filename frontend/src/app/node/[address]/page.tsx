import {usePageLogic} from "@/app/node/[address]/page.logic";

export default function Page({ params }: { params: { address: string } }) {
  const logic = usePageLogic(params.address);
  return (
    <>
      {logic.address}
    </>
  );
}
