defmodule MemeBase.Schema do
  use Absinthe.Schema

  object :meme do
    field :id, :id
    field :url, :string
  end

  query do
    field :memes, list_of(:meme) do
      resolve fn (_, _)->
        {:ok, [
          %{id: "1", url: "whatever.com/meme"},
          %{id: "3", url: "memebase.inseng.net/vanilla-milk-shake"},
        ]}
      end
    end
  end
end
