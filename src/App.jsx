import "./App.css";
import CampaignList from "./Compaignlist";
import Compaign from "./Compaign";
import LoginSignupForm from "./LoginSignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleCampaign from "./SingleCampaign";
import SingleInputComponent from "./Components/SingleInputComponent";
import Newsegment from "./Components/Newsegment";
import withHeader from "./WithHeader"; // Import the HOC
import ChooseTemplate from "./Components/Choosetemplate";
import Template from "./Template";
import Testmail from "./Testmail";
import CreateTemplate from "./Components/CreateTemplate";
import CreateCampaign from "./CreateCampaign";
import Form from "./Form";
import Breadcrumbs from "./Components/Breadcrumbs";
import Campaignmetric from "./Components/Campaignmatrices";
import Hello from "./Components/TempComponentFolder/Paging";
import AllSegments from "./Components/Allsegments";
import AllTemplates from "./Components/AllTemplates";
import GlobalStateUpdater from "./Components/GlobalStateUpdater";
import Reactemaileditor from "./Components/Reactemaileditor";
import Analytics from "./Components/Analytics";
// Wrap the CampaignList component with the HOC and pass the title prop as a parameter.
// This will add a header with the provided title to the CampaignList component.
// The HOC will also add a back button to the header.
// The HOC will also add a back button to the header.
// The HOC will also add a back button to the header.
const HeaderedCampaignList = withHeader(CampaignList);
const CampaignwithHeader = withHeader(CreateCampaign);
const CampaignName = withHeader(SingleInputComponent);
const AllTemplateswithHeader = withHeader(AllTemplates);
const AllSegmentswithheader = withHeader(AllSegments);
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <GlobalStateUpdater />
          <Routes>
            <Route path="/" element={<LoginSignupForm />} />
            <Route path="/allcampaigns" element={<HeaderedCampaignList />} />
            <Route path="/campaign" element={<CampaignwithHeader />} />
            <Route path="/create-campaign" element={<CampaignName />} />
            <Route path="/newsegment" element={<Newsegment />} />
            <Route path="/campaign-details" element={<SingleCampaign />} />
            <Route path="/choosetemplate" element={<ChooseTemplate />} />
            <Route path="/templatepreview" element={<Template />} />
            <Route path="/createtemplate" element={<CreateTemplate />} />
            <Route path="/allsegments" element={<AllSegmentswithheader />} />
            <Route path="/alltemplates" element={<AllTemplateswithHeader />} />
            <Route path="/reactemaileditor" element={<Reactemaileditor />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/testmail" element={<Testmail/>} />
            {/* <Route path="/reactemaileditor" element={<Reactemaileditor />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
