module Utils
  class FileStringIO < StringIO
    attr_accessor :original_filename

    def initialize(data, name)
      super(data)
      @original_filename = name
    end
  end
end
