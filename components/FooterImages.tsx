import Image from "next/image";

export function FooterImages() {
  return (
    <>
      <div className="absolute bottom-8 right-14">
        <Image
          src="/mario.png"
          height={100}
          width={100}
          className="rounded-lg"
        />
      </div>
      <div className="absolute -bottom-4 right-16">
        <Image src="/flex.png" height={100} width={100} />
      </div>
      <div className="absolute -bottom-4 right-0">
        <Image src="/commodore.png" height={100} width={100} />
      </div>
      <div className="absolute -bottom-5 left-1">
        <Image src="/boosh.png" height={100} width={100} />
      </div>
      <div className="absolute -bottom-3 left-14">
        <Image src="/barbosa.png" height={80} width={100} />
      </div>
      <div className="absolute -bottom-3 left-24">
        <Image src="/icecube.png" height={100} width={150} />
      </div>
      <div className="absolute -bottom-6 left-44">
        <Image src="/greg.png" height={90} width={90} />
      </div>
    </>
  );
}
