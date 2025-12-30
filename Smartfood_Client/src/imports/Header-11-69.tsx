import svgPaths from "./svg-wpnvdmh34z";
import imgLogo from "figma:asset/f89d550f01270433f9bd3ba9aa8a5e2ad81f03e5.png";

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.45] left-0 not-italic text-[#16a249] text-[24px] text-nowrap top-[-2.2px] tracking-[-0.48px] whitespace-pre">SMARTFOOD</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[32px] relative shrink-0 w-[137.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-center relative w-[137.188px]">
        <div className="relative shrink-0 size-[40px]" data-name="Logo">
          <img alt="Logomark" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
        </div>
        <Text />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#16a249] h-[40px] left-0 rounded-[4px] top-0 w-[85.838px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[5.8px] whitespace-pre">Inicio</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[40px] left-[89.84px] rounded-[4px] top-0 w-[111.662px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#364153] text-[16px] text-nowrap top-[5.8px] whitespace-pre">Catálogo</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[40px] left-[205.5px] rounded-[4px] top-0 w-[121.863px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#364153] text-[16px] text-nowrap top-[5.8px] whitespace-pre">Contenido</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[40px] left-[331.36px] rounded-[4px] top-0 w-[176.188px]" data-name="Button">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#364153] text-[16px] text-nowrap top-[5.8px] whitespace-pre">Retroalimentación</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
            <path d={svgPaths.p11b86180} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-[527.55px] pb-0 pt-[8px] px-[8px] rounded-[2.68435e+07px] size-[40px] top-0" data-name="Button">
      <Icon />
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[40px] relative shrink-0 w-[567.55px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[567.55px]">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between relative w-full">
          <Container />
          <Navigation />
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-white relative size-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[0.8px] pt-[16px] px-[24px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}