defmodule MemeBase.Schema do
  use Absinthe.Schema

  query do
    field :hello, :string do
      resolve fn (_, _)->
        {:ok, "Hello"}
      end
    end
  end
end
