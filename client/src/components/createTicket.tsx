import { Link } from "react-router-dom";
import Card from "./common/Card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketInterface } from "../interfaces";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTicketService } from "../services/ticket.service";

function CreateTicket() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketInterface>();

  const createTicketMutation = useMutation({
    mutationFn: createTicketService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["createTicket"] });
      toast.success(data.data.message);
      reset({ topic: "", description: "", severity: "", status: "", type: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onHandleCreateTicket: SubmitHandler<TicketInterface> = (data) => {
    if (data) {
      createTicketMutation.mutate(data);
    }
  };

  return (
    <div className="flex h-[92vh] w-screen">
      <div className="w-[100vw] flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Link
          to={"/ticket"}
          className="my-5 w-auto bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
        >
          See All Tickets
        </Link>
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Create Ticket</h2>
              <span className="text-white pr-2">Do not have an agent?</span>
              <a href={"/agent"} className="text-blue-600 hover:text-blue-500 hover:cursor-pointer">
                Create agent
              </a>
            </div>

            <div className="mb-6">
              <label htmlFor="topic" className="text-sm text-gray-400">
                Topic:
              </label>
              <input
                type="topic"
                id="topic"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register("topic", {
                  required: "This field is required!",
                })}
              />
              {errors.topic && (
                <p className="text-red-500 text-sm">{(errors.topic as FieldError).message}</p>
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
                <p className="text-red-500 text-sm">{(errors.description as FieldError).message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="text-sm text-gray-400">
                Type:
              </label>
              <input
                type="type"
                id="type"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register("type", {
                  required: "This field is required !",
                })}
              />
              {errors.type && (
                <p className="text-red-500 text-sm">{(errors.type as FieldError).message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="severity" className="text-sm text-gray-400">
                Severity:
              </label>
              <input
                type="severity"
                id="severity"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register("severity", {
                  required: "This field is required !",
                })}
              />
              {errors.severity && (
                <p className="text-red-500 text-sm">{(errors.severity as FieldError).message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="status" className="text-sm text-gray-400">
                Status:
              </label>
              <input
                type="status"
                id="status"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                {...register("status", {
                  required: "This field is required !",
                })}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{(errors.status as FieldError).message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit(onHandleCreateTicket)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Create Ticket
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateTicket;
