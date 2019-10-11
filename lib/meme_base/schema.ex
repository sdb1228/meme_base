defmodule MemeBase.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  alias MemeBase.{Meme, Repo}

  object :meme do
    field :id, :id
    field :url, :string do
      resolve fn (meme, _, _) ->
        # TODO - make bucket configurable
        # TODO - cache this url
        ExAws.Config.new(:s3)
        |> ExAws.S3.presigned_url(:get, "memebase", meme.s3_path)
      end
    end

    field :likes, :integer do
      resolve fn (_, _) ->
        {:ok, :rand.uniform(100)}
      end
    end
  end

  object :like_meme_payload do
    field :meme, type: :meme
  end

  connection node_type: :meme

  mutation do
    @desc "Like a meme"
    field :like_meme, type: :like_meme_payload do
      arg :id, non_null(:id)
      resolve fn (%{id: id}, _) ->
        {:ok, %{meme: Meme |> Repo.get(id)}}
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
