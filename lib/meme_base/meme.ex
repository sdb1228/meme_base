defmodule MemeBase.Meme do
  use Ecto.Schema

  schema "memes" do
    field :s3_path, :string
  end
end
