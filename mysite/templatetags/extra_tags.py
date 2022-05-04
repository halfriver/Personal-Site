from django import template

register = template.Library()


@register.filter
def print_file_content(f):
    code = ""
    try:
        with f.open(mode="r") as file:
            for line in file.readlines():
                code += line
            file.close()
            return code
    except IOError:
        return ''
