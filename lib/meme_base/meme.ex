defmodule MemeBase.Meme do
  use Ecto.Schema

  schema "memes" do
    field :url, :string
  end
end
