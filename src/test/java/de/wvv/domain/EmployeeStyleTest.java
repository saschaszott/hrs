package de.wvv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.wvv.web.rest.TestUtil;

public class EmployeeStyleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeStyle.class);
        EmployeeStyle employeeStyle1 = new EmployeeStyle();
        employeeStyle1.setId(1L);
        EmployeeStyle employeeStyle2 = new EmployeeStyle();
        employeeStyle2.setId(employeeStyle1.getId());
        assertThat(employeeStyle1).isEqualTo(employeeStyle2);
        employeeStyle2.setId(2L);
        assertThat(employeeStyle1).isNotEqualTo(employeeStyle2);
        employeeStyle1.setId(null);
        assertThat(employeeStyle1).isNotEqualTo(employeeStyle2);
    }
}
