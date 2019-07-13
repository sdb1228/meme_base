defmodule MemeBase.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  alias MemeBase.{Meme, Repo}

  object :meme do
    field :id, :id
    field :url, :string
  end

  connection node_type: :meme

  query do
    connection field :memes_connection, node_type: :meme do
      resolve fn (args, _) ->
        Absinthe.Relay.Connection.from_query(Meme, &Repo.all/1, args)
      end
    end
  end
end
