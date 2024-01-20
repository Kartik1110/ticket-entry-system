import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Card from "./common/Card";
import { AgentInterface } from "../interfaces";
import { agentService } from "../services/agent.service";
import CustomLoader from "./common/CustomLoader";
import { AGENT_FORM_FIELDS } from "../constants";
import InputField from "./common/InputField";

function Agent() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentInterface>();

  /* The `createAgentMutation` is used to handle the mutation (creation) of an agent. */
  const createAgentMutation = useMutation({
    mutationFn: agentService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createAgent"] });
      toast.success(data.data.message);
      reset({ name: "", email: "", phone: "", description: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /**
   * The function `onHandleCreateAgent` is a submit handler that calls the `createAgentMutation` function
   * with the provided data if it exists.
   */
  const onHandleCreateAgent: SubmitHandler<AgentInterface> = (data) => {
    if (data) {
      console.log("🚀 ~ Agent ~ data:", data);
      createAgentMutation.mutate(data);
    }
  };

  return (
    <>
      {createAgentMutation.isPending ? (
        <CustomLoader />
      ) : (
        <div className="flex h-[92vh] w-screen ">
          <div className="w-[100vw] flex items-center justify-center bg-gradient-to-r from-black to-gray-800">
            <Card>
              <div className="mb-5 float-left text-left">
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold">Create Agent</h2>
                  <span className="text-white pr-2">Already have an agent?</span>
                  <Link
                    to={"/create-ticket"}
                    className="text-blue-600 hover:text-blue-500 hover:cursor-pointer"
                  >
                    Create ticket
                  </Link>
                </div>

                {/* Form Fields */}
                {AGENT_FORM_FIELDS.map((item) => (
                  <InputField
                    key={item.id}
                    label={item.label}
                    name={item.name as "name" | "email" | "phone" | "description" | "active"}
                    register={register}
                    registerOptions={item.registerOptions}
                    errors={errors}
                  />
                ))}
                <button
                  onClick={handleSubmit(onHandleCreateAgent)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
                >
                  Create Agent
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default Agent;
