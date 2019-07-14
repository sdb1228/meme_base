defmodule MemeBase.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  alias MemeBase.{Meme, Repo}

  object :meme do
    field :id, :id
    field :url, :string
  end

  connection node_type: :meme

  mutation do
    @desc "Create a meme"
    field :create_meme, type: :meme do
      arg :url, non_null(:string)
      resolve fn (%{url: url}, _)->
        %MemeBase.Meme{url: url} |> MemeBase.Repo.insert
      end
    end
  end

  query do
    connection field :memes_connection, node_type: :meme do
      resolve fn (args, _) ->
        Absinthe.Relay.Connection.from_query(Meme, &Repo.all/1, args)
      end
    end
  end
end
