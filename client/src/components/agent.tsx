import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { AgentInterface } from "../interfaces";
import Card from "./common/Card";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentService } from "../services/agent.service";
import CustomLoader from "./common/CustomLoader";
import { Link } from "react-router-dom";

function Agent() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentInterface>();

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

  const onHandleCreateAgent: SubmitHandler<AgentInterface> = (data) => {
    if (data) {
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

                <div className="mb-4">
                  <label htmlFor="name" className="text-sm text-gray-400">
                    Name:
                  </label>
                  <input
                    type="name"
                    id="name"
                    className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
                    {...register("name", {
                      required: "This field is required!",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{(errors.name as FieldError).message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="text-sm text-gray-400">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
                    {...register("email", {
                      required: "This field is required !",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "The value should be an email !",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{(errors.email as FieldError).message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="text-sm text-gray-400">
                    Phone:
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
                    {...register("phone", {
                      required: "This field is required !",
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{(errors.phone as FieldError).message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="description" className="text-sm text-gray-400">
                    Description:
                  </label>
                  <input
                    type="description"
                    id="description"
                    className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                    {...register("description", {
                      required: "This field is required !",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {(errors.description as FieldError).message}
                    </p>
                  )}
                </div>

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
