defmodule MemeBase.Schema do
  use Absinthe.Schema

  object :meme do
    field :id, :id
    field :url, :string
  end

  query do
    field :memes, list_of(:meme) do
      resolve fn (_, _)->
        {:ok, MemeBase.Meme |> MemeBase.Repo.all}
      end
    end
  end
end
