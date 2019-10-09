defmodule MemeBase.Repo.Migrations.UpdateMemes do
  use Ecto.Migration

  def change do
    rename table("memes"), :url, to: :s3_path
  end
end
