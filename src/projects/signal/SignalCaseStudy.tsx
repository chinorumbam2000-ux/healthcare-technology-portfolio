import AboutMe from './AboutMe';
import BusinessImpact from './BusinessImpact';
import HowIBuilt from './HowIBuilt';
import Pitch from './Pitch';
import Problem from './Problem';
import ProofItWorks from './ProofItWorks';
import ReflectionCredits from './ReflectionCredits';
import ResponsibleAI from './ResponsibleAI';
import SeeItInAction from './SeeItInAction';
import SourcesDisclosure from './SourcesDisclosure';
import TryItNow from './TryItNow';
import WhyNow from './WhyNow';

/**
 * The Signal by ProbeSyQ capstone case study. Sections are added here, in
 * page order, one approved stage at a time.
 */
export default function SignalCaseStudy() {
  return (
    <>
      <TryItNow />
      <Pitch />
      <Problem />
      <WhyNow />
      <HowIBuilt />
      <SeeItInAction />
      <ProofItWorks />
      <ResponsibleAI />
      <BusinessImpact />
      <AboutMe />
      <ReflectionCredits />
      <SourcesDisclosure />
    </>
  );
}
