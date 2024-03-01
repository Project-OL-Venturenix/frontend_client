import java.util.*;
import java.math.*;

public class Question2 {
  public List<Integer> duplicateCounts(int[] nums1, int[] nums2, int[] nums3) {
    // Enter the code Here.Your class should be named Question2.
    int[] answer = countTheNum(nums1, nums2, nums3);
    Set<Integer> output = new HashSet<>();
    for (int i = 0; i < answer.length; i++) {
      if (answer[i] > 1)
        output.add(i + 1);
    }
    return new ArrayList<>(output);
  }

  public int[] countTheNum(int[] nums1, int[] nums2, int[] nums3) {
    int[] counter = new int[100];
    for (int[] nums : new int[][] {nums1, nums2, nums3}) {
      Set<Integer> seen = new HashSet<>();
      for (int num : nums) {
        if (seen.add(num)) {
          counter[num - 1]++;
        }
      }
    }
    return counter;

  }

  public static void main(String[] args) {
    int q2TCPassed = 0;
    Question2 question2 = new Question2();

    q2TCPassed += executeTestCase(question2, new int[] {1, 1, 3, 2},
        new int[] {2, 3}, new int[] {3});

    q2TCPassed += executeTestCase(question2, new int[] {3, 1}, new int[] {2, 3},
        new int[] {1, 2});

    q2TCPassed += executeTestCase(question2, new int[] {1, 2, 2},
        new int[] {4, 3, 3}, new int[] {5});

    q2TCPassed += executeTestCase(question2,
        new int[] {1, 2, 100, 100, 100, 2, 3, 4, 5, 6, 7, 65, 8, 9, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 100, 100, 100, 100,
            100, 100, 100, 100, 100},
        new int[] {4, 3, 3, 99, 100, 1, 2, 3, 4, 5, 6, 7, 65, 8, 9, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25},
        new int[] {5, 6, 7, 8, 4, 34, 55, 66, 77, 88, 99, 100});

    int[] nums1 = new int[100];
    int[] nums2 = new int[100];
    int[] nums3 = new int[100];

    for (int i = 0; i < 100; i++) {
      nums1[i] = i + 1;
    }
    int j = 0;
    for (int i = 100; i > 0; i--) {
      nums2[j++] = i;
    }
    Arrays.fill(nums3, 100);

    q2TCPassed += executeTestCase(question2, nums1, nums2, nums3);

    System.out.println("Test Case Result: " + q2TCPassed + " / 5");
    long startTime = System.nanoTime();
    long endTime = System.nanoTime();
    long duration = (endTime - startTime) / 1000000; // Milliseconds
    System.out
        .println("Time taken for Test Cases: " + duration + " milliseconds");
  }

  public static int executeTestCase(Question2 question, int[][] incomeBrackets,
      int income, double expectedTax) {
    double actualTax = question.computeTax(incomeBrackets, income);
    if (Math.abs(actualTax - expectedTax) < 0.00001) {
      System.out.println("Test Passed: Income=" + income + ", Expected Tax="
          + expectedTax + ", Actual Tax=" + actualTax);
      return 1;
    } else {
      System.out.println("Test Failed: Income=" + income + ", Expected Tax="
          + expectedTax + ", Actual Tax=" + actualTax);
      return 0;
    }
  }
}
