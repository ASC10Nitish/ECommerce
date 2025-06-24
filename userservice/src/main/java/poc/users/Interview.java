package poc.users;

import java.util.Arrays;
import java.util.stream.Collectors;

public class Interview {
    public static void main(String[] args) {

        int[] numbers = {1,3,6,33,66,7,12,13,18,19};

//        numbers.stream().filter(n->n%2==0).collect(Collectors.toList());
        Arrays.stream(numbers).filter(n->n%2==0).forEach(System.out::println);
    }
}
