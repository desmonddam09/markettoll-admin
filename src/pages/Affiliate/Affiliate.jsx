import { useContext, useEffect, useState } from "react";
import AffiliatePerformance from "../../components/affiliate/AffiliatePerformance";
import Stats from "../../components/affiliate/state";
import { IoIosArrowBack } from "react-icons/io";
import AllInfluencerRate from "../../components/affiliate/AllInfluencerRate";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function Affiliate() {
  const [totalAffiliate, setTotalAffiliate] = useState(false);
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [linkActive, setLinkActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [statusLoader, setStatusLoader] = useState(false);
  const [Settings, setSettings] = useState("");
  const [refetch, SetRefetch] = useState(() => () => {});
  const fetchInfluencerSettings = () => {
    setLoader(!loader);
    try {
      const token = isUserData?.token;
        if (!token) return;
      fetch(`${BASE_URL}/admin/rate-settings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSettings(res?.data?.rateStatus);
          console.log(res?.data?.rateStatus, "messages");
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("error.message");
    }
  };

  useEffect(() => {
    fetchInfluencerSettings();
  }, []);

  useEffect(() => {
    setLinkActive(Settings == "manual" ? false : true);
  }, [Settings]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      {totalAffiliate && (
        <button
          className="absolute top-5 z-30"
          onClick={() => setTotalAffiliate(false)}
        >
          {" "}
          <IoIosArrowBack size={25} color="#666666" />{" "}
        </button>
      )}
      {!totalAffiliate && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold"> Affiliate</h1>
            <div className="flex flex-col gap-2 justify-center items-center space-x-3">
              <div>
                <span className="text-gray-700 mr-5 font-medium">
                  {Settings === "auto" ? "Auto" : "Manual"}
                </span>
                <button
                  onClick={async () => {
                    const newStatus = Settings === "auto" ? "manual" : "auto"; // Toggle value
                    try {
                      setStatusLoader(true);
                      const response = await fetch(
                        `${BASE_URL}/admin/update-rate-settings`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            rateStatus: newStatus,
                          }),
                        }
                      );

                      const result = await response.json();
                      if (response.ok) {
                        console.log("Success:", result);
                        toast.success("Settings Updated");
                        fetchInfluencerSettings(); // Refetch to update `Settings`
                      } else {
                        console.error("API error:", result);
                        toast.error(result.error.message);
                      }
                    } catch (error) {
                      toast.error(error?.error?.message || "Network error");
                      console.error("Network error:", error);
                    } finally {
                      setStatusLoader(false);
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    Settings === "auto" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      Settings === "auto" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="bg-[#0098EA] p-2 px-3 rounded-md text-white mt-3"
              >
                Update Influencer Rate
              </button>
            </div>
          </div>

          <Stats
            setTotalAffiliate={setTotalAffiliate}
            totalAffiliate={totalAffiliate}
          />
        </>
      )}
      <AllInfluencerRate
        refetch={refetch}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <AffiliatePerformance
        SetRefetch={SetRefetch}
        totalAffiliate={totalAffiliate}
      />
    </div>
  );
}
