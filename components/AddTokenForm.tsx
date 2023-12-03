"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddTokenForm() {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const addTokenMutation = useMutation({
    mutationFn: (id) =>
      fetch(`${process.env.NEXT_PUBLIC_ADD_TOKENS_URL}?token_id=${id}`, {
        method: "POST",
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monitored_tokens"] });
    },
  });

  const addToken = (data) => {
    addTokenMutation.mutate(data.token_id);
    reset();
  };

  return (
    <form className="w-full max-w-sm mb-3" onSubmit={handleSubmit(addToken)}>
      <div className="flex items-center border-b border-gray-500 py-2">
        <input
          {...register("token_id", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Token id"
          aria-label="Token id"
        />
        <button
          disabled={addTokenMutation.isPending}
          className="flex-shrink-0 transition duration-500 ease-in-out bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          {addTokenMutation.isPending ? "Loading..." : "Add Token"}
        </button>
      </div>
      <div>
        {addTokenMutation.isError && (
          <div className="text-red-500">Error adding token</div>
        )}
      </div>
    </form>
  );
}
