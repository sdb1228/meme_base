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
